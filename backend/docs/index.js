const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const paths = require('./paths')


// this means exporting all the configs from different files 
// we can actually write all config into 1 big file though
module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...paths,
};