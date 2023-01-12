/**
 * 验证器
 */

/**
 * @param {string} field 字符串格式的字段，如 entry[title]
 */
function parseField(field) {
    return field.split(/\[|\]/).filter((s) => s)
}

function getField(req, field) {
    let val = req.body
    field.forEach((key) => {
        val = val[key]
    })

    return val
}

/**
 * require 中间件
 * @param {string} field 字段名称
 * @returns 
 */
function require(field) {
    // 解析 field
    field = parseField(field)

    return (req, res, next) => {
        if (getField(req, field)) {
            next()
        } else {
            console.error(`${field.join(' ')} is required`)
            res.redirect('back')
        }
    }
}

/**
 * 长度校验中间件
 * @param {string} field 
 * @param {number} len 
 * @returns
 */
function lengthAbove(field, len) {
    field = parseField(field)

    return (req, res, next) => {
        if (getField(req, field).length >= len) {
            next()
        } else {
            console.error(`${field.join(' ')} must length above ${len}`)
            res.redirect('back')
        }
    }
}

export { require, lengthAbove }