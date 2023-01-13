import { Segment } from 'segment'

const seg = new Segment()
seg.useDefault()

// 开始分词
console.log(seg.doSegment('这是一个基于Node.js的中文分词模块。'))