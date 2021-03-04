
module.exports = {
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    },
    nextRandom(array){
        return array[Math.trunc(Math.random()*array.length)]
    },
    random(scalar){
        return Math.trunc(Math.random()*scalar)
    },
    mention(userId){
        return "<@"+userId+">"
    }
}