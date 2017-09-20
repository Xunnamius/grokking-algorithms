#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

/**
 * https://goo.gl/hm3nXL
 * Worst case: O(log n)
 * Averg case: O(log n)
 */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

const TEST_TITLE = 'BINARY SEARCH';
const DO_SORT = true;
const N = [5, 256, -8, 4, 2, 1, 97, -34, 55, 2, 0, 64];

const SearchStrategy = require('search/SearchStrategy');
const BubbleSort = require('sort/BubbleSort');

module.exports = class extends SearchStrategy
{
    constructor(nSpace)
    {
        super(nSpace);
    }

    find(subject)
    {
        this.sort();

        let item, floor = 0;
        let ceil = this._nSpace.length;

        while(floor <= ceil)
        {
            let index = floor + Math.floor((ceil - floor) / 2);
            item = this._nSpace[index];

            if(item === undefined) break;

            if(item < subject)
                floor = index + 1;

            else if(item > subject)
                ceil = index - 1;

            else if(item == subject)
                return index;
        }

        return  this.constructor.Result.NotFound;
    }
};

if(!module.parent)
{
    console.log(`--${TEST_TITLE} TEST--`);

    let algo = new module.exports(N);

    algo.sortStrategy = new BubbleSort();

    console.log('Result: ', module.exports.Result);
    console.log('N: ', N);

    if(DO_SORT)
    {
        algo.sort();
        console.log('n: ', algo._nSpace);
    }

    console.log('(7) 5 in n: ', algo.find(5));
    console.log('(11) 256 in n: ', algo.find(256));
    console.log('(-1) -50 in n: ', algo.find(-50));
    console.log('(0) -34 in n: ', algo.find(-34));

    console.log('(FALSE) -50 in n: ', algo.exists(-50));
    console.log('(TRUE) -34 in n: ', algo.exists(-34));

    console.log('--FINISHED--');
}
