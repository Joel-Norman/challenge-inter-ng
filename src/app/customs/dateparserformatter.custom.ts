import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		
		if (value) {
			console.log(value)
			const date = value.split(this.DELIMITER);
			if(date.length===3){
				date[2]=date[2].slice(0,4)
				return {
					day: parseInt(date[0], 10),
					month: parseInt(date[1], 10),
					year: parseInt(date[2], 10),
				};
			}
			
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}
