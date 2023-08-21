import { Component, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { RubroService } from 'src/app/services/rubro.service';
interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'France',
		flag: 'c/c3/Flag_of_France.svg',
		area: 640679,
		population: 64979548,
	},
	{
		name: 'Germany',
		flag: 'b/ba/Flag_of_Germany.svg',
		area: 357114,
		population: 82114224,
	},
	{
		name: 'Portugal',
		flag: '5/5c/Flag_of_Portugal.svg',
		area: 92090,
		population: 10329506,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},
	{
		name: 'Vietnam',
		flag: '2/21/Flag_of_Vietnam.svg',
		area: 331212,
		population: 95540800,
	},
	{
		name: 'Brazil',
		flag: '0/05/Flag_of_Brazil.svg',
		area: 8515767,
		population: 209288278,
	},
	{
		name: 'Mexico',
		flag: 'f/fc/Flag_of_Mexico.svg',
		area: 1964375,
		population: 129163276,
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
	},
	{
		name: 'India',
		flag: '4/41/Flag_of_India.svg',
		area: 3287263,
		population: 1324171354,
	},
	{
		name: 'Indonesia',
		flag: '9/9f/Flag_of_Indonesia.svg',
		area: 1910931,
		population: 263991379,
	},
	{
		name: 'Tuvalu',
		flag: '3/38/Flag_of_Tuvalu.svg',
		area: 26,
		population: 11097,
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
	},
];
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent {
  	page;
	pageSize;
	collectionSize;
	countries: Country[];

	dataTable:any

	constructor(
    private _rubroService:RubroService,
    private modalService: NgbModal,
	public messageService:MessageService,
	
  ) {
		
	}
  ngOnInit(): void {

    this._rubroService.list().subscribe(
      data=>{
        console.log(data)
		this.dataTable=data.data
		this.page = data.pagination.actualPage;
		this.pageSize =  data.pagination.resultPerPage
		this.collectionSize = data.pagination.totalResults;
      }
    )
  }
  onInput(event){
	if(event.target.value.trim()){
		this._rubroService.search(event.target.value).subscribe(
			data=>{
				this.dataTable=data.data
				this.page = data.pagination.actualPage;
				//this.pageSize =  data.pagination.resultPerPage
				this.collectionSize = data.pagination.totalResults;
			}
		)
	}
	
  }
  refresh() {
	this._rubroService.listPagination(this.pageSize,this.page).subscribe(
		data=>{
			
			this.dataTable=data.data
			this.page = data.pagination.actualPage;
			this.collectionSize = data.pagination.totalResults;
		}
	)
}
  	openVerticallyCentered(content) {
		this._rubroService.item=undefined
		this._rubroService.isUpdate=false;
		this.modalService.open(content, { centered: true });
	}
	edit(content,item){
		this._rubroService.isUpdate=true;
		this._rubroService.item={id:item.id,codigo:item.codigo,nombre:item.nombre};
		this.modalService.open(content, { centered: true });
	}
	show(content,item){
		this._rubroService.isUpdate=true;
		this._rubroService.item={id:item.id,codigo:item.codigo,nombre:item.nombre};
		this._rubroService.show().subscribe(data=>{
			if (data.success) {
				this._rubroService.item={id:data.data.id,codigo:data.data.codigo,nombre:data.data.nombre};
				this.modalService.open(content, { centered: true });
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			console.log(data)
			
		})
		
	}
	delete(item){
		this._rubroService.item={id:item.id,codigo:item.codigo,nombre:item.nombre};
		this._rubroService.delete().subscribe(data=>{
			console.log(data)
			if (data.success) {
				this.messageService.showMessage('success','Eliminado con exito!')
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			
		})
	}
	public changeSuccessMessage() {
		this.messageService.showMessage('danger','mensaje de danger')
	}
	
}
