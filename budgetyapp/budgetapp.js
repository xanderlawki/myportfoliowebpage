var Budgetcontroller = (function() {
    var Expense = function(id, description, value, percentage) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    Expense.prototype.calcpercentage = function(totalincome) {
        if (totalincome > 0) {
         this.percentage = Math.round((this.value / totalincome) * 100);
        }
        else {
            this.percentage = -1; 
        }
        
    }
    Expense.prototype.getpercentage = function() {
        return this.percentage;
    }
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var calculateTotal = function(type) {
        var sum = 0;
        data.allitems[type].forEach(function(cur) {
            sum = sum + cur.value;
            data.totals[type] = sum;
        })
    }
    var data =  {
        allitems: {
            exp: [],
            inc: [],
            
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };
    return {
        additem: function(type, des, val) {
            var newItem, ID;
            ///create new id
            
            ID = data.allitems[type].length;
        
            
            ////create new item based on inc or exp/////
            if(type === 'exp') {
               newItem = new Expense(ID, des, val);
            }
            else if(type === 'inc') {
                newItem = new Income(ID, des, val);
         }
            
        /////push it into our data structure////
            data.allitems[type].push(newItem);
              ////return the new element////    
            return newItem;
 
        },
        
        deleteitem: function(type, id) {
            
            var ids, index;
            ids = data.allitems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id); 
            if( index !== -1) {
                data.allitems[type].splice(index, 1)
            }
        },
        
       calculatebudget: function() {
           ///calculate total income and expenses
           calculateTotal('inc');
           calculateTotal('exp');
           
           ////calculate the budget
           data.budget = data.totals.inc - data.totals.exp;
           
           ////claculate the percentage///
          if( data.budget > 0)  {
             data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

          }
           else {
            data.percentage = -1
           }
       },
        calculatepercentages: function() {
            data.allitems.exp.forEach(function(cur) {
                cur.calcpercentage(data.totals.inc);
            }); 
        },
        getpercentages: function() {
            var allperc = data.allitems.exp.map(function(cur) {
                return cur.getpercentage();
            });
            return allperc;
        },
        
        getbudget: function() {
            return {
              budget: data.budget,
            percentage: data.percentage,
            totalinc: data.totals.inc,
            totalexp: data.totals.exp
              
            }
            
            
            
        },
        
        
    };
    
})();


var UIcontroller = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputbtn: '.add__btn',
        incomecontainer: '.income__list',
        expensecontainer: '.expenses__list',
        budgetlabel: '.budget__value',
        budgetincome: '.budget__income--value',
        budgetexpense: '.budget__expenses--value',
        percentagevalue: '.budget__expenses--percentage',
        container: '.container',
        expenseperclabel: '.item__percentage',
        datelabel:'.budget__title--month'
        
    }
    var formatnum = function(num, type) {
            var numsplit, int, dec, type;
            num = Math.abs(num);
            num = num.toFixed(2);
            numsplit = num.split('.');
            int = numsplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }
            dec = numsplit[1];
            
            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec; 
            
        };
    
    var nodelistForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);  
                }
            };
        
     
    return {
        getInput: function() {
        return {
            type: document.querySelector(DOMstrings.inputType).value, /////will be either inc or exp
            description: document.querySelector(DOMstrings.inputdescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputvalue).value)
        }
    },
         addlistitem: function(obj, type) {
            var html, newhtml, element
            
            /////create html string with some placeholder text///
            if (type === 'inc') {
                element = DOMstrings.incomecontainer;
               html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            else if(type === 'exp') {
                element = DOMstrings.expensecontainer;
               html = '<div class="item clearfix" id="exp-%id%"><div class="item__desription">%description%</div><div class="right clearfix"><div xclass="item__value">%value% </div><div class="item__percentage"> 21% </div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>'
            }
             
             /// replace the placeholder text with some actual data/////
            newhtml = html.replace('%id%', obj.id);
             newhtml = newhtml.replace('%description%', obj.description);  
             newhtml = newhtml.replace('%value%', formatnum(obj.value, type));
             
             ///insert the html to the dom
                  document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
  
        },
        deletelistitem: function(selectorid) {
            var el;
            var el = document.getElementById(selectorid);
            el.parentNode.removeChild(el);
        },
        
        getDOMstrings: function() {
        return DOMstrings;
    },
        clearfields: function() {
            var fields, fieldsarr;
           fields =  document.querySelectorAll(DOMstrings.inputdescription + ',' + DOMstrings.inputvalue);
          fieldsarr = Array.prototype.slice.call(fields);
            fieldsarr.forEach(function(current, index, array) {
                current.value = ""
            })
            fieldsarr[0].focus();
        },
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
          document.querySelector(DOMstrings.budgetlabel).textContent = formatnum(obj.budget, type);
          document.querySelector(DOMstrings.budgetincome).textContent = formatnum(obj.totalinc, 'inc');
          document.querySelector(DOMstrings.budgetexpense).textContent = formatnum(obj.totalexp, 'exp');
            if (obj.percentage > 0) {
            document.querySelector(DOMstrings.percentagevalue).textContent = obj.percentage + '%';
            }
            else {
                 document.querySelector(DOMstrings.percentagevalue).textContent = '---';
 
            }
          
        },
        displaypercentages: function(percentages) {
         var fields = document.querySelectorAll(DOMstrings.expenseperclabel); 
            
            nodelistForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                 current.textContent = percentages[index] + '%';
                }
                else {
                    current.textContent = '---'; 
                }
            });
            
        },
        displaydate: function() {
            var now, month, months, year;
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            months = ['JANUARY', 'FEBRAURY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            document.querySelector(DOMstrings.datelabel).textContent = months[month] + ' ' + year;
        },
        changeType: function() {
            var fields = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.inputdescription + ',' + DOMstrings.inputvalue);
            nodelistForEach(fields,function(current) {
                current.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputbtn).classList.toggle('red-focus');
        }
        
    }
    

})();

var Controller = (function(budgetctrl, uictrl) {
    var setupEventhandler = function() {
                   var DOM = uictrl.getDOMstrings();

         document.querySelector(DOM.inputbtn).addEventListener('click', controlleradditem);
    
    document.addEventListener('keypress', function(event) {
        if(event.keycode === 13 || event.which === 13) {
            controlleradditem();
        }
    })
     document.querySelector(DOM.container).addEventListener('click', ctrldeleteitem);
        document.querySelector(DOM.inputType).addEventListener('change', uictrl.changeType);
    };
    
           
    var updatebudget = function() {
        ///calculate the budget
        budgetctrl.calculatebudget();
        ///return the budget///
        var budget = budgetctrl.getbudget();
        ////display it in the ui///
        uictrl.displayBudget(budget);
        
    };
    
    var updatepercentage = function() {
        budgetctrl.calculatepercentages();
        
        var percentages = budgetctrl.getpercentages();
        
        uictrl.displaypercentages(percentages);
        
        
        
};
    
   var controlleradditem = function () {
       ///get the input field data
       var input = uictrl.getInput();
       
       if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
          var input = uictrl.getInput();
           ///add the item to the budget controller///
  var newitem = budgetctrl.additem(input.type, input.description, input.value);
           ///add the item to the ui controller///
       var additem = uictrl.addlistitem(newitem, input.type);
           ///clear the input field data
      uictrl.clearfields();
           ///update budget//
       updatebudget();
       updatepercentage();
       }
       
   };
    
    var ctrldeleteitem = function(event) {
        var itemID, splitID, type, ID;
      itemID  = (event.target.parentNode.parentNode.parentNode.parentNode.id);
        
        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            budgetctrl.deleteitem(type, ID);
            uictrl.deletelistitem(itemID);
            updatebudget();
            
            
            
            
            
            
        }
    };
    return {
        init: function() {
            console.log('application has started');
            setupEventhandler();
            uictrl.displaydate();
             uictrl.displayBudget({
              budget: 0,
            percentage: -1,
            totalinc: 0,
            totalexp: 0
              
            });
            
        }
    }
    
    
})(Budgetcontroller, UIcontroller);

Controller.init();



                   