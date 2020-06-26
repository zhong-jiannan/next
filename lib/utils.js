import Moment from 'moment'

export const timeFromNow = (time) =>{
    return Moment(time).fromNow()
}
