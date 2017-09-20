#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

/**
 * https://goo.gl/qeq7UD
 * Worst case: O(n^2)
 * Averg case: O(n^2)
 */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

const TEST_TITLE = 'SELECTION SORT';
const N = [5, 256, -8, 4, 2, 1, 97, -34, 55, 2, 0, 64];

const SortStrategy = require('sort/SortStrategy');

module.exports = class extends SortStrategy
{
    sort(items)
    {
        for(let i = 0, len = items.length; i < len; ++i)
        {
            let smallestNumberIndex = i;

            for(let j = i + 1; j < len; ++j)
            {
                if(items[j] < items[smallestNumberIndex])
                    smallestNumberIndex = j;
            }

            this.swap(items, i, smallestNumberIndex);
        }

        return items;
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
