#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

const SortStrategy = require('sort/SortStrategy');

module.exports = class
{
    get sortStrategy() { return this._sortStrategy; }
    set sortStrategy(/*SortStrategy*/ sortStrategy)
    {
        if(!(sortStrategy instanceof SortStrategy))
            throw new Error("provided sort strategy is not an instance of SortStrategy");

        this._sortStrategy = sortStrategy;
    }

    constructor(nSpace)
    {
        this._nSpace = nSpace || [];
        this._sorted = false;
    }

    find(/*item*/)
    {
        throw new Error("not implemented");
    }

    exists(item)
    {
        return this.find(item) !== this.constructor.Result.NotFound;
    }

    sort()
    {
        if(this._sorted)
            return;

        this._nSpace = this.sortStrategy.sort(this._nSpace);
        this._sorted = true;
    }
};

Object.defineProperty(module.exports, 'Result', {
    enumerable: false,
    writable: false,
    configurable: true,
    value: {
        'NotFound': -1,
    }
});
