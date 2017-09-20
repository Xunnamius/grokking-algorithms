#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

module.exports = class SortStrategy
{
    sort(/*items*/)
    {
        throw new Error("not implemented");
    }
};
