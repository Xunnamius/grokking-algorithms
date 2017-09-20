#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

/**
 * https://goo.gl/XrBzt
 * Worst case: O(n log n)
 * Averg case: O(n log n)
 */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

const TEST_TITLE = 'QUICK SORT';
const N = [5, 256, -8, 4, 2, 1, 97, -34, 55, 2, 0, 64];

const SortStrategy = require('sort/SortStrategy');

module.exports = class extends SortStrategy
{
    sort(items)
    {
        if(items.length < 2)
            return items;

        let pivot   = items.splice(Math.floor(items.length / 2), 1);
        let lesser  = items.filter(item => item < pivot);
        let greater = items.filter(item => item >= pivot);

        return this.sort(lesser).concat(pivot).concat(this.sort(greater));
    }
};

if(!module.parent)
{
    console.log(`--${TEST_TITLE} TEST--`);
    
    let algo = new module.exports();

    console.log('n: ', N);
    console.log('s: ', algo.sort(N));

    console.log('--FINISHED--');
}
