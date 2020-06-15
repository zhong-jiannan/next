import LRU from 'lru-cache'

const cache = new LRU({
    maxAge:1000*60*10
})

function generateFullName(params){
    const { query, language, sort, order, page} = params
    if(!query){throw new Error('必须提供query属性')}
    let fullName = `q=${query}`
    if(language){fullName += `l=${language}`}
    if(sort){fullName += `s=${sort}`}
    if(order){fullName += `o=${order}`}
    if(!page){
        fullName += `p=1`
    }else{
        fullName += `p=${page}`
    }

    return fullName
}

export function getCacheRepo(fullName){
    return cache.get(fullName)
}

export function setCacheRepo(repo){
    const fullName = repo.full_name
    return cache.set(fullName,repo)
}

export function getCacheReadme(fullName){
    return cache.get(fullName)
}

export function setCacheReadme(fullName,readme){
    return cache.set(fullName,readme)
}

export function setCacheSearchList(query,lists){
    return cache.set(generateFullName(query),lists)
}

export function getCacheSearchList(query){
    return cache.get(generateFullName(query))
}

export default function cacheArray(repos){
    repos.forEach( repo => setCacheRepo(repo))
}