import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtileriaService {

  constructor() { }


  addCheckItem(items:any[]){
    let items_transformed:any[]=items;
    for(let item in items)
      items[item]["check"]=false;

    return items_transformed;
  }

  checkAllItems(items:any[],verified:boolean){
    let items_checked:any[] = items;
    for(let item in items_checked)
      items_checked[item].check = verified ?  true:false;

    return items_checked;
  }


  sortBy(by: string | any,array:any[],sorted:boolean): any {

    array.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return sorted ? -1 : 1;
      }

      return 0;
    });

    return {sorted:!sorted,
            usuarios:array};
  }

  getCheked(items:any[]){
    let array_checked:any[]=[];
    for(let item of items){
      if(item.check){
        array_checked.push(item);
      }
    }

    return array_checked
  }

  public isElement(array:any[]){
    return array.length==1 ? true:false;
  }



}
