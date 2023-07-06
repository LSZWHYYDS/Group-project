export default {
  onShareAppMessage(e) {
    console.log(e);
    return {
      title: '自定义标题',
      path: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=1',
      imageUrl:'https://tse1-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=1'
    }
  },
}
