/**
 * 
 * @returns {String} Return unique string with date
 */
export const uniqueId = () => {
  return `${new Date().valueOf()}${Math.floor(Math.random() * (1000 - 1)) + 1}`
}