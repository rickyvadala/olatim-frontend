import domtoimage from "dom-to-image";
import {useCallback} from "react";

export const useDownload = (node: HTMLDivElement, filename: string | null = 'olatim') => {
  console.log('useD')


  const download = useCallback(async () => {
    if (node) {
      const dataUrl = await domtoimage.toJpeg(node, {quality: 100, bgcolor: '#fff', style: {padding: 16}})
      let link = document.createElement('a');
      link.download = `${filename}.jpeg`;
      link.href = dataUrl;
      return link.click();
    }
  }, [filename, node])

  return [download];
}