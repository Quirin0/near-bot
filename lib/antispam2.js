const usedCommandRecently = new Set()

/**
 * Check is number filtered
 * @param  {String} from
 */
const isFiltered2 = (sender) => !!usedCommandRecently.has(sender)

/**
 * Add number to filter
 * @param  {String} from
 */
const addFilter2 = (sender) => {
    usedCommandRecently.add(sender)
    setTimeout(() => usedCommandRecently.delete(sender), 3000)
}

module.exports = {
    isFiltered2,
    addFilter2
}
