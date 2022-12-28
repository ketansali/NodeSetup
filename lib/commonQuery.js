'use strict'
/*
 * commonQuery - commnQuery.js
 * Author: Vision InfoTech
 *
 */

var mongoose = require('mongoose')

var commonQuery = {}

/**
 * Function is used to get the host url with port
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.getHost = function (req) {
  return req.protocol + '://' + req.get('host')
}

/**
 * Function is used clone deep the array for removing the reference
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.cloneDeep = function (array) {
  if (array) return JSON.parse(JSON.stringify(array))
  return array
}

/**
 * Function is used to decode the uris from body
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.decodeUris = function (body) {
  if (body) {
    Object.keys(body).map((x) => (body[x] = decodeURIComponent(body[x])))
  }
  return body
}

/**
 * Function is use to Fetch Single data
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.findoneData = async function findoneData(
  model,
  condition,
  fetchVal,
) {
  return new Promise(function (resolve, reject) {
    model.findOne(condition, fetchVal, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Function is use to Find One and Update
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.findOneAndUpdate = async function findOneAndUpdate(
  model,
  condition,
  setVal,
) {
  return new Promise(function (resolve, reject) {
    model.findOneAndUpdate(
      condition,
      setVal,
      { useFindAndModify: false },
      function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      },
    )
  })
}

/**
 * Function is use to Fetch Single data
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */

commonQuery.findoneWithPopulate = function findoneWithPopulate(
  model,
  cond,
  populate,
  populate1,
  populate2,
) {
  return new Promise(function (resolve, reject) {
    model
      .findOne(cond)
      .populate(populate)
      .populate(populate1)
      .populate(populate2)
      .exec(function (err, userData) {
        if (err) {
          reject(err)
        } else {
          resolve(userData)
        }
      })
  })
}

commonQuery.findoneBySort = function findoneBySort(
  model,
  condition,
  fetchVal,
  sortby,
) {
  return new Promise(function (resolve, reject) {
    if (!sortby) {
      sortby = {
        _id: -1,
      }
    }
    model
      .findOne(condition, fetchVal)
      .sort(sortby)
      .exec(function (err, data) {
        if (err) {
          console.log('err---->>>>>', err)
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}
/**
 * Function is use to Last Inserted id
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.lastInsertedId = function lastInsertedId(model) {
  return new Promise(function (resolve, reject) {
    model
      .findOne()
      .sort({
        id: -1,
      })
      .exec(function (err, data) {
        if (err) {
          resolve(0)
        } else {
          if (data) {
            var id = data.id + 1
          } else {
            var id = 1
          }
        }
        resolve(id)
      })
  })
}
commonQuery.sortAllData = function sortAllData(model, field_name) {
  return new Promise(function (resolve, reject) {
    model
      .find()
      .sort(field_name)
      .exec(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}
commonQuery.sortAllDataDesc = function sortAllDataDesc(model, field_name) {
  return new Promise(function (resolve, reject) {
    let to_sort = {}
    to_sort[field_name] = -1
    model
      .find()
      .sort(to_sort)
      .exec(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}

commonQuery.findLastOrFirstByValue = function findLastOrFirstByValue(
  model,
  field_name,
  sortType,
) {
  return new Promise(function (resolve, reject) {
    let to_sort = {}
    to_sort[field_name] = sortType === 'ASC' ? 1 : -1
    model
      .find()
      .sort(to_sort)
      .collation({ locale: 'en_US', numericOrdering: true })
      .limit(1)
      .exec(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}

commonQuery.lastInsertedIdPermissonId = function lastInsertedId(model) {
  return new Promise(function (resolve, reject) {
    model
      .findOne()
      .sort({
        permission_id: -1,
      })
      .exec(function (err, data) {
        if (err) {
          resolve(0)
        } else {
          if (data) {
            var id = data.permission_id + 1
          } else {
            var id = 1
          }
        }
        resolve(id)
      })
  })
}

/**
 * Function is use to Insert object into Collections
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.InsertIntoCollection = function InsertIntoCollection(model, obj) {
  return new Promise(function (resolve, reject) {
    new model(obj).save(function (err, insertedData) {
      if (err) {
        console.log('errrrrrrrr', err)
        reject(err)
      } else {
        console.log('insertedData', insertedData)
        resolve(insertedData)
      }
    })
  })
}
/**
 * Function is use to Update One Document
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.updateOneDocument = function updateOneDocument(
  model,
  updateCond,
  updateData,
) {
  return new Promise(function (resolve, reject) {
    model
      .findOneAndUpdate(
        updateCond,
        {
          $set: updateData,
        },
        {
          new: true,
        },
      )
      .lean()
      .exec(function (err, updatedData) {
        if (err) {
          console.log('errerrerrerrerrerr', err)
          reject(0)
        } else {
          console.log('Updated: ', updatedData._id)
          resolve(updatedData)
        }
      })
  })
}
commonQuery.updateOne = function updateOne(model, updateCond, updateData) {
  return new Promise(function (resolve, reject) {
    model
      .updateOne(updateCond, {
        $set: updateData,
      })
      .lean()
      .exec(function (err, updatedData) {
        if (err) {
          console.log('errerrerrerrerrerr', err)
          reject(0)
        } else {
          console.log('updatedData', updatedData)
          resolve(updatedData)
        }
      })
  })
}
/**
 * Function is use to Update One Document
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.updateOneDocumentWithOutInserting = (
  model,
  updateCond,
  updateData,
) => {
  return new Promise((resolve, reject) => {
    model
      .findOneAndUpdate(updateCond, {
        $set: updateData,
      })
      .exec((err, updatedData) => {
        if (err) {
          console.log(err)
          return reject(0)
        } else {
          return resolve(updatedData)
        }
      })
  })
}

/**
 * Function is use to Update All Document
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.updateAllDocument = function updateAllDocument(
  model,
  updateCond,
  userUpdateData,
) {
  return new Promise(function (resolve, reject) {
    model
      .update(
        updateCond,
        {
          $set: userUpdateData,
        },
        {
          multi: true,
        },
      )
      .lean()
      .exec(function (err, userInfoData) {
        if (err) {
          resolve(0)
        } else {
          resolve(userInfoData)
        }
      })
  })
}
/**
 * Function is use to upload file into specific location
 * @access private
 * @return json
 * Created by Divya
 * @Vision InfoTech
 */
commonQuery.fileUpload = function fileUpload(imagePath, buffer) {
  console.log('fileee', imagePath, buffer)
  return new Promise((resolve, reject) => {
    try {
      let tempObj = {
        status: false,
      }
      fs.writeFile(imagePath, buffer, function (err) {
        if (err) {
          console.log('err', err)
          tempObj.error = err
          reject(err)
        } else {
          console.log('success')
          tempObj.status = true
          tempObj.message = 'uploaded'
          console.log('tempObj', tempObj)
          resolve(tempObj)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}
commonQuery.updateMany = function updateMany(
  model,
  updateCond,
  userUpdateData,
) {
  return new Promise(function (resolve, reject) {
    model
      .updateMany(updateCond, {
        $set: userUpdateData,
      })
      .lean()
      .exec(function (err, userInfoData) {
        if (err) {
          resolve(0)
        } else {
          resolve(userInfoData)
        }
      })
  })
}

/**
 * Function is use to Find all Documents
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.fetch_all = function fetch_all(model, cond = {}, fetchd = {}) {
  return new Promise(function (resolve, reject) {
    model.find(cond, fetchd).exec(function (err, userData) {
      console.log('userData', userData)
      if (err) {
        console.log('errrrrrr', err)
        reject(err)
      } else {
        resolve(userData)
      }
    })
  })
}
commonQuery.fetch_all_by_sort = function fetch_all_by_sort(
  model,
  cond,
  sortBy,
) {
  return new Promise(function (resolve, reject) {
    if (!cond) {
      cond = {}
    }
    if (!sortBy) {
      sortBy = {}
    }
    model
      .find(cond)
      .sort(sortBy)
      .exec(function (err, userData) {
        if (err) {
          console.log('errrrrrr', err)
          reject(err)
        } else {
          resolve(userData)
        }
      })
  })
}
commonQuery.fetch_one = function fetch_one(model, cond = {}, fetchd = {}) {
  return new Promise(function (resolve, reject) {
    model.findOne(cond, fetchd).exec(function (err, resData) {
      if (err) {
        console.log('errrrrrr', err)
        reject(err)
      } else {
        resolve(resData)
      }
    })
  })
}
commonQuery.hard_delete = function hard_delete(model, cond = {}) {
  return new Promise(function (resolve, reject) {
    model.remove(cond).exec(function (err, Data) {
      if (err) {
        console.log('errrrrrr', err)
        reject(err)
      } else {
        console.log('Data', Data)

        resolve(Data)
      }
    })
  })
}
/**
 * Function is use to Find all Distinct value
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */

commonQuery.fetch_all_distinct = function fetch_all_distinct(
  model,
  ditinctVal,
  cond,
) {
  return new Promise(function (resolve, reject) {
    model.distinct(ditinctVal, cond).exec(function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Function is use to Count number of record from a collection
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.countData = function countData(model, cond) {
  return new Promise(function (resolve, reject) {
    model.countDocuments(cond).exec(function (err, userData) {
      if (err) {
        reject(err)
      } else {
        resolve(userData)
      }
    })
  })
}
/**
 * Function is use to Fetch All data from collection , Also it supports aggregate function
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.fetchAllLimit = function fetchAllLimit(query) {
  return new Promise(function (resolve, reject) {
    query.exec(function (err, userData) {
      if (err) {
        reject(err)
      } else {
        resolve(userData)
      }
    })
  })
}

/**
 * Function is use to Insert object into Collections , Duplication restricted
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */

commonQuery.uniqueInsertIntoCollection = function uniqueInsertIntoCollection(
  model,
  cond,
  obj,
) {
  return new Promise(function (resolve, reject) {
    model.findOneAndUpdate(
      cond,
      { $set: obj },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      function (err, data) {
        if (err) {
          console.log(err, 'error...')
          resolve(0)
        } else {
          resolve(data)
        }
      },
    )
  })
}

/**
 * Function is use to DeleteOne Query
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.deleteOneDocument = function deleteOneDocument(model, cond) {
  return new Promise(function (resolve, reject) {
    model.deleteOne(cond).exec(function (err, userData) {
      if (err) {
        resolve(0)
      } else {
        resolve(1)
      }
    })
  })
}
/**
 * Function is use to Insert Many object into Collections
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.InsertManyIntoCollection = function InsertManyIntoCollection(
  model,
  obj,
) {
  return new Promise(function (resolve, reject) {
    model.insertMany(obj, function (error, inserted) {
      if (error) {
        console.log('---------------------', error)
        resolve(error)
      } else {
        resolve(inserted)
      }
    })
  })
}

/**
 * Function is use to delete Many document from Collection
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */
commonQuery.deleteManyfromCollection = function deleteManyfromCollection(
  model,
  obj,
) {
  return new Promise(function (resolve, reject) {
    model.deleteMany(obj, function (error, inserted) {
      if (error) {
        console.log('Reject', error)
        resolve(0)
      } else {
        console.log('Resolved')
        reject(1)
      }
    })
  })
}

commonQuery.mongoObjectId = function (data) {
  if (data && data !== null && data !== undefined) {
    return mongoose.Types.ObjectId(data)
  } else {
    return false
  }
}

/**
 * Function is use to aggregate with match and lookup
 * @access private
 * @return json
 * Created by Vision InfoTech
 * @Vision InfoTech
 */

commonQuery.aggregateFunc = function aggregateFunc(
  model,
  fromTable,
  localFieldVal,
  foreignFieldVal,
  condition,
) {
  return new Promise(function (resolve, reject) {
    model
      .aggregate([
        {
          $match: condition,
        },
        {
          $lookup: {
            from: fromTable,
            localField: localFieldVal,
            foreignField: foreignFieldVal,
            as: 'docs',
          },
        },
      ])
      .exec(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}

commonQuery.doubleLookup = function doubleLookup(
  model,
  fromTable,
  localFieldVal,
  foreignFieldVal,
  condition,
  second_fromTable,
  second_localFieldVal,
  second_foreignFieldVal,
) {
  return new Promise(function (resolve, reject) {
    model
      .aggregate([
        {
          $match: condition,
        },
        {
          $lookup: {
            from: fromTable,
            localField: localFieldVal,
            foreignField: foreignFieldVal,
            as: 'docs',
          },
        },
        {
          $lookup: {
            from: second_fromTable,
            localField: second_localFieldVal,
            foreignField: second_foreignFieldVal,
            as: 'dataa',
          },
        },
      ])
      .exec(function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}
commonQuery.getNextSequenceValue = function (sequenceName) {
  return new Promise(function (resolve, reject) {
    let query = {
      _id: sequenceName,
    }
    counters
      .findOneAndUpdate(
        query,
        {
          $inc: {
            sequence_value: 1,
          },
        },
        {
          new: true,
        },
      )
      .lean()
      .exec(function (err, updatedData) {
        if (err) {
          console.log('errerrerrerrerrerr', err)
          reject(0)
        } else {
          console.log('updatedData', updatedData)
          resolve(updatedData)
        }
      })
  })
}

/**
 * Function is use to Fetch all data
 * @access private
 * @return json
 * @Vision InfoTech
 */
commonQuery.findData = function findData(model, cond, fetchVal) {
  return new Promise(function (resolve, reject) {
    let tempObj = {
      status: false,
    }
    model.find(cond, fetchVal, function (err, userData) {
      if (err) {
        tempObj.error = err
        reject(tempObj)
      } else {
        tempObj.status = true
        tempObj.data = userData
        resolve(tempObj)
      }
    })
  })
}

module.exports = commonQuery
