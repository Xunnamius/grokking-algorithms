let bfs = (graph, start, target) =>
{
    if(start == target)
        return true;

    let seen = [start];
    let q = graph[start];

    while(q.length)
    {
        let subject = q.shift();

        if(seen.includes(subject))
            continue;

        seen.push(subject);

        if(subject == target)
            return true;

        q = q.concat(graph[subject]);
    }

    return false;
};

graph = {
    'tre': ['abe', 'ricky'],
    'abe': ['tre', 'mark'],
    'ricky': ['tre', 'tyrese'],
    'mark': ['abe'],
    'tyrese': ['ricky', 'trevor', 'matthew'],
    'trevor': ['tyrese', 'matthew'],
    'matthew': ['tyrese', 'trevor'],
};

console.log(bfs(graph, 'tre', 'tre'));
console.log(bfs(graph, 'tre', 'matthew'));
console.log(bfs(graph, 'tre', 'rakim'));
