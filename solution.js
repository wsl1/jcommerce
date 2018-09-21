let data = {}; //  key -> userToken, value -> array of urls

////////////////////////PROBLEM 1////////////////////////////////

const saveUrl = (userToken, url) => {
    if(!data[userToken]) {
        data[userToken] = [];
    }
    if(data[userToken].includes(url)) return false;
    data[userToken].push(url);
    return true;
} 

const getUrls = (userToken) => data[userToken]; 

const removeUrl = (userToken, url) => {
    const index = data[userToken].indexOf(url);
    if (index > -1) {
        data[userToken].splice(index, 1);
        return true;
    }
    return false;
}

////////////////////////PROBLEM 2////////////////////////////////

const getUsersByDomain = (domain) => {
    domain = getDomain(domain);
    const result = [];
    for(let userToken in data) {
        if(data[userToken].includes(domain)){
            result.push(userToken);
        };
    }
    return result;
}

////////////////////////PROBLEM 3////////////////////////////////

const getRecommendedUrls = (userToken, url) => {

    const currentNode = getNode(url);

    const result = [];

    const queue = [];

    queue.push(currentNode.A());
    queue.push(currentNode.B());
    queue.push(currentNode.C());

    while(queue.length > 0) {
        const last = queue[queue.length - 1];

        result.push(last.A().A());
        result.push(last.A().B());
        result.push(last.A().C());

        result.push(last.B().A());
        result.push(last.B().B());
        result.push(last.B().C());

        result.push(last.C().A());
        result.push(last.C().B());
        result.push(last.C().C());

        queue.pop()
    }

    const recommendedUrls = [];
    result.forEach((node) => {
        recommendedUrls.push(node.getUrl());
    })

    return recommendedUrls;
}