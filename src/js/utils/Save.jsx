import {saveAs} from 'file-saver'
import moment from 'moment'

export const downloadPng = (stage) => {
	//var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	//r.saveAs(blob, "hello world.txt"

	const date = moment().format("YYYY-MM-DD_hh:mm:ss");;

	stage.canvas.toBlob(blob =>  {
		saveAs(blob, `oekaki_${date}.png`);
	});
}