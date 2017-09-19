#!/usr/bin/env node

require("babel-polyfill")
require("babel-core/register")({
    presets:["es2015","stage-3"]
})

require("../app.js")