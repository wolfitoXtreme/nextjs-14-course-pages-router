module.exports = {
  '*.(js|ts|tsx)': 'yarn eslint --max-warnings=0',
  '*.(scss|css)': 'stylelint --max-warnings=0',
  '*.(js|ts|tsx)': 'prettier --config .prettierrc.js --check',
};
