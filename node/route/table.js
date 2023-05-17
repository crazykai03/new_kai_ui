

let data1 =[{'type_id':'02','control_led-id':'0045','lock-id':'0002','status':'OFF','reference_id':"door1",'dry_contact_id':'1'},{'type_id':'01','control_led-id':'0023','lock-id':'0003','status':'ON','reference_id':"door2",'dry_contact_id':'2'}]
let data2=[1]

var interval_pause = false;

const location_input = document.getElementById('mylocation');


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};






const gridOptions = {
  defaultColDef: {
   
    resizable: true,
   
    sortable: true,

  },
  // debug: true,
  columnDefs: [
      {

        field: 'type_id',
        checkboxSelection: true,
        filter: 'agSetColumnFilter',
        filterParams: {
                applyMiniFilterWhileTyping: true,
            },

      },

      {
        field: 'lock_id',
        
        
         
         
      },
      {
        field: 'control_led-id',
        
        
         
         },
     
      {
        field: 'status'

      },
      {
        field: 'reference_id',
        editable: true,
       
        
        
      },
      {
        field:'dry_contact_id',
        editable:true,
        cellEditorSelector: cellEditorSelector,
       

      }
     

    



  ],
  rowSelection: 'multiple',

  rowData: null,
  animateRows: true,
  
    rowClassRules: {
    "row-fail": params => params.api.getValue("status", params.node) != "O",
    "row-pass": params => params.api.getValue("status", params.node) == "O"
  },
  onCellEditingStarted  :() => {
    console.log("set to true")
    interval_pause = true;
  
  },
  onCellEditingStopped :()=>{
   send()
   interval_pause=false;

  },
  onRowSelected :(event)=>{

  	
   if (event.node.isSelected()==true)	
   		interval_pause = true;
   else
        interval_pause = false;	

  },

  onSortChanged :()=> {

  	console.log(data1)

  console.log("update")

  send()


  }


 

};



// setup the grid after the page has finished loading

const gridDiv = document.querySelector('#mylockgrid');
  new agGrid.Grid(gridDiv, gridOptions);


 gridOptions.api.setRowData(data1);




const foucsout_event = function(e) {
  send()
  interval_pause = false;

}



location_input.addEventListener('focusin', (event) => {interval_pause=true});
location_input.addEventListener('focusout',foucsout_event);







function onRemoveSelected() {

  var selectedRowData = gridOptions.api.getSelectedRows();
  console.log(selectedRowData)
  gridOptions.api.applyTransaction({ remove: selectedRowData });
  temp_data=[]; 
  gridOptions.api.forEachNode(function(node){
  temp_data.push(node.data);  



});
  data1 = temp_data;
  send()


}


        function send() {
    const lock_infromation = data1;
    const number_count = gridOptions.api.getDisplayedRowCount();
    const mylocation =  document.getElementById("mylocation").value;
    
    
    
   
    console.log("send")
    console.log(data1);
           
              
              const json = {
                  lock_data: lock_infromation,
                 
                 
            };

            console.log(json)
 
            fetch("/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            });
        }





const  getvalue_interval = setInterval(function () {



	

	

    console.log(interval_pause)
    gridOptions.api.setDomLayout('autoHeight');
    document.querySelector('#mylockgrid').style.height = '';

   if (interval_pause ==false) {
  getJSON("/getstoreregister",function(err, data) {
  if (err !== null) {
    console.log(err);
  } else {
     console.log(data) 
     data1=data   
     gridOptions.api.setRowData(data);
     document.getElementById("mylocation").value = data[0]["mylocation"]
     
  }
  
})

}


   
  



}, 1000 ) ; 


function cellEditorSelector(params) {

 return {
      component: NumericCellEditor,
    };





}
