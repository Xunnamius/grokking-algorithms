#!/usr/bin/env node
/*jshint esversion:6, devel:true */
///*global */

"use strict";

process.env.NODE_PATH = __dirname + '/..';
require('module').Module._initPaths();

const TEST_TITLE = 'GRAPH NODE';

let uniqueIdCounter = 0;

module.exports = class
{
    constructor(name)
    {
        this._nodes = [];
        this._uniqueId = name || uniqueIdCounter++;
    }

    get neighbors() { return this._nodes; }
    get id() { return this._uniqueId; }

    /**
     * breadth first search
     */
    canPathTo(/*GraphNode*/ node)
    {
        if(node == this)
            return true;

        let seen = [this];
        let q = this.neighbors.slice();

        while(q.length)
        {
            let subject = q.shift().vertex;

            if(seen.includes(subject))
                continue;

            seen.push(subject);

            if(subject == node)
                return true;

            q = q.concat(subject.neighbors.slice());
        }

        return false;
    }

    /**
     * Dijkstra's algorithm
     */
    shortestPathTo(/*GraphNode*/ node)
    {
        let costTable = {
            [node.id]: { from: null, to: node, cost: Infinity },
            [this.id]: { from: null, to: this, cost: 0 },
        };

        let processed = [node];
        let subject = this;

        while(subject instanceof module.exports)
        {
            subject.neighbors.forEach(neighbor =>
            {
                let costTableRow = costTable[neighbor.vertex.id];
                let cost = costTable[subject.id].cost + neighbor.edgeWeight;

                if(!costTableRow || cost < costTableRow.cost)
                {
                    costTable[neighbor.vertex.id] = {
                        from: subject,
                        to: neighbor.vertex,
                        cost: cost,
                    };
                }
            });

            processed.push(subject);
            subject = null;

            Object.keys(costTable).forEach(key =>
            {
                let costTableRow = costTable[key];

                if(!processed.includes(costTableRow.to) && (!subject || costTableRow.cost < costTable[subject.id].cost))
                    subject = costTableRow.to;
            });
        }

        let path = [];

        if(costTable[node.id].cost != Infinity)
        {
            path.push(node);

            while(path[path.length - 1] != this)
                path.push(costTable[path[path.length - 1].id].from);
        }

        path.toString = () => path.map(item => item.id).reverse().join(' -> ') || '(no path)';

        return {
            path: path,
            cost: costTable[node.id].cost
        };
    }

    addNeighbor(neighbor, weight = 0)
    {
        this._nodes.push({ vertex: neighbor, edgeWeight: weight });
    }

    removeNeighbor(/*GraphNode*/ neighbor)
    {
        delete this._nodes[this._nodes.indexof(neighbor)];
    }
};

if(!module.parent)
{
    console.log(`--${TEST_TITLE} TEST--`);
    
    let tre = new module.exports('tre');
    let abe = new module.exports('abe');
    let ricky = new module.exports('ricky');
    let mark = new module.exports('mark');
    let tyrese = new module.exports('tyrese');
    let trevor = new module.exports('trevor');
    let matthew = new module.exports('matthew');
    let ephrum = new module.exports('ephrum');

    // weighted DAG
    tre.addNeighbor(abe, 9);
    tre.addNeighbor(ricky, 10);
    abe.addNeighbor(mark, 4);
    ricky.addNeighbor(tyrese, 6);
    tyrese.addNeighbor(trevor, 8);
    tyrese.addNeighbor(matthew, 10);

    console.log('(weighted DAG) tre canPathTo tre:', tre.canPathTo(tre));
    console.log('(weighted DAG) tre canPathTo ricky:', tre.canPathTo(ricky));
    console.log('(weighted DAG) tre canPathTo matthew:', tre.canPathTo(matthew));
    console.log('(weighted DAG) tre canPathTo ephrum:', tre.canPathTo(ephrum));
    console.log('(weighted DAG) tyrese canPathTo tre:', tyrese.canPathTo(tre));

    let result = tre.shortestPathTo(matthew);
    let result2 = mark.shortestPathTo(ricky);
    let result3 = matthew.shortestPathTo(ephrum);

    console.log('(weighted DAG) path from tre to matthew:', result.path.toString(), `(cost: ${result.cost})`);
    console.log('(weighted DAG) path from mark to ricky:', result2.path.toString(), `(cost: ${result2.cost})`);
    console.log('(weighted DAG) path from matthew to ephrum:', result3.path.toString(), `(cost: ${result3.cost})`);

    console.log('----');

    let book = new module.exports('book');
    let lp = new module.exports('lp');
    let poster = new module.exports('poster');
    let drums = new module.exports('drums');
    let guitar = new module.exports('guitar');
    let piano = new module.exports('piano');

    book.addNeighbor(lp, 5);
    book.addNeighbor(poster, 0);
    lp.addNeighbor(guitar, 15);
    lp.addNeighbor(drums, 20);
    poster.addNeighbor(guitar, 30);
    poster.addNeighbor(drums, 35);
    drums.addNeighbor(piano, 10);
    guitar.addNeighbor(piano, 20);

    result = book.shortestPathTo(piano);

    console.log(`shortest path between book and piano:`, result.path.toString());
    console.log(`total cost:`, result.cost);

    console.log('----');

    tre = new module.exports();
    abe = new module.exports();
    ricky = new module.exports();
    mark = new module.exports();
    tyrese = new module.exports();
    trevor = new module.exports();
    matthew = new module.exports();

    // unweighted graph
    tre.addNeighbor(abe);
    tre.addNeighbor(ricky);
    tre.addNeighbor(tre);
    abe.addNeighbor(tre);
    abe.addNeighbor(mark);
    ricky.addNeighbor(tre);
    ricky.addNeighbor(tyrese);
    mark.addNeighbor(abe);
    tyrese.addNeighbor(ricky);
    tyrese.addNeighbor(trevor);
    tyrese.addNeighbor(matthew);
    trevor.addNeighbor(tyrese);
    trevor.addNeighbor(matthew);
    matthew.addNeighbor(tyrese);
    matthew.addNeighbor(trevor);

    console.log('(unweighted) tre canPathTo tre:', tre.canPathTo(tre));
    console.log('(unweighted) tre canPathTo ricky:', tre.canPathTo(ricky));
    console.log('(unweighted) tre canPathTo matthew:', tre.canPathTo(matthew));
    console.log('(unweighted) tre canPathTo ephrum:', tre.canPathTo(ephrum));
    console.log('(unweighted) tyrese canPathTo tre:', tyrese.canPathTo(tre));

    console.log('--FINISHED--');
}
