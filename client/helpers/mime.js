export default class MimeHelper {
  static getType(inputFileType: string): string {
    const mimeType = inputFileType.split('/')[0];
    return mimeType;
  }

  static isImage(inputFileType: string): boolean {
    const mimeType = this.getType(inputFileType);
    if (mimeType === 'image') {
      return true;
    }
    return false;
  }
}
