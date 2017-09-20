#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

module.exports = class
{
    get madeSwap() { return this._madeSwap; }
    set madeSwap(val) { this._madeSwap = !!val; }

    constructor()
    {
        this._madeSwap = false;
    }

    sort(/*items*/)
    {
        throw new Error("not implemented");
    }

    swap(items, index1, index2)
    {
        if(index1 === index2)
            return;

        let tmp = items[index1];
        items[index1] = items[index2];
        items[index2] = tmp;

        this.madeSwap = true;
    }
};
