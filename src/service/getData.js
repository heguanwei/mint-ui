import {loginPostRequest} from '../config/fetch'

//搜索
export const searchMovieData = (searchValue)=> loginPostRequest("api/movie/search?start=0&q="+searchValue,{});

// 当前热映
export const topMovie = ()=> loginPostRequest("api/movie/top250",{});

// 正在上映
export const inTheaterData = ()=> loginPostRequest("api/movie/in_theaters",{});

// 即将上映
export const comingSoonData = ()=> loginPostRequest("api/movie/coming_soon",{});

//获取banner
export const getBanner = ()=> loginPostRequest("api/movie/subject/1764796",{});

//获取单个电影的信息
export const getSimpleMovieData = (currId)=> loginPostRequest("api/movie/subject/"+currId,{ });

//获取单个电影的评价
export const getSimpleMovieView = (currId)=> loginPostRequest("api/movie/subject/1054395/reviews",{ });

// 获取单个影人的信息
export const getSimpleMovieCast = (currId)=> loginPostRequest("api/movie/celebrity/"+currId,{ });