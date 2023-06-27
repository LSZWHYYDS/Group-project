// 引入ali-oss
let OSS = require('ali-oss')
/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 */
export function client(data) {//data后端提供数据
  console.log(data)

  const bucket = 'wkkc';
  // region是该bucket所在区域，一般是bucket的EndPoint的前部分
  const region = 'oss-accelerate';
  // var urllib = OSS.urllib;
  // var Buffer = OSS.Buffer;
  // var OSS = OSS.Wrapper;
  // var STS = OSS.STS;

  return new OSS({
    region: region,
    accessKeyId: data.accessId,
    accessKeySecret: data.accessKey,
    stsToken: data.secretToken,
    bucket: bucket,
    timeout:60000
  })
}


//取消分配上传
export async function abortMultipartUpload(data, names, uploadIds) {


  const bucket = 'wkzxsoft';
  const region = 'oss-cn-qingdao';
  const client = new OSS({
    region: region,
    accessKeyId: data.accessId,
    accessKeySecret: data.accessKey,
    stsToken: data.secretToken,
    bucket: bucket
  })


  const name = names; // Object所在Bucket的完整路径。
  const uploadId = uploadIds; // 分片上传uploadId。
  const result = await client.abortMultipartUpload(name, uploadId);

}



/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  function guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4());
  }
  return `${guid()}${rx()}${rx()}`
}
// 图标上传oss
export function fileUpdateOSS(data) {
  return new OSS({
    region: 'oss-cn-qingdao',
    accessKeyId: data.accessId,
    accessKeySecret: data.accessKey,
    stsToken: data.secretToken,
    bucket: 'wkkcimg'
  });
}
