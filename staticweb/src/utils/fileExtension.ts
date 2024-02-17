export function getFileExtension(fileName: string): string {
    const parts = fileName.split(".");
    if (parts.length === 1) {
      return ""; // 没有后缀
    }
    return parts[parts.length - 1];
  }
  