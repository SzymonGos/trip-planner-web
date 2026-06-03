module.exports = {
  '*.{json,yml,md,sql}': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
};
