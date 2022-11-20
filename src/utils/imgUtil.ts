import goodStorage from 'good-storage'

export class LmgUtil {
  static imgList: Record<string, string> = {}

  static storageImgList() {
    this.imgList = goodStorage.get("imgList") || {}

    if (this.isEmpty()) {
      this.loadAllImg()
      goodStorage.set("imgList", this.imgList)
    }
  }

  static isEmpty() {
    return !Object.getOwnPropertyNames(this.imgList).length
  }
  
  static loadAllImg() {
    const imgMap: Record<string, {[key: string]: string}> = import.meta.glob('../assets/img/**/*.png', {eager: true})
    let absolutePath: string = "" // 绝对路径
    let imgName: string = "" // 图片名
    
    for (let relativePath in imgMap) {
      absolutePath = imgMap[relativePath].default
      imgName = absolutePath.substring(absolutePath.lastIndexOf("/") + 1)
      if (absolutePath) {
        this.imgList[imgName] = absolutePath
      }
    }
    console.log("imgMap", this.imgList)
  }
}