export const customClick = item => new CustomEvent('dps:click', {
  cancelable: true,
  detail: { item }
})