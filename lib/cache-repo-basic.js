import LRU from 'lru-cache'

const cache = new LRU({
    maxAge:1000*60*10
})

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

export default function cacheArray(repos){
    repos.forEach( repo => setCacheRepo(repo))
}