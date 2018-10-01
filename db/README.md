# Peticiones a la Base de Datos
## selectAll(params)
El llamado a la funcion se hace de la siguiente manera selectAll(table,columns,filters,order,asc,limit)  
Donde cada uno de los parametro puede tomar los siguientes valores:  
Parametro | Descripcion  
:---: | :---:
table | Este parametro nunca se puede dejar vacio, ej. 'User'  
columns | Este parametro se puede dejar vacio de la siguiente manera: '', con dobles comillas sin espacio entre ellas, o especificar las columnas que queremos obtener ej. ['id','type']  
filters | Este parametro se puede dejar vacio de la siguiente manera: '', con dobles comillas sin espacio entre ellas, o especificar los filtros de la siguiente manera: entre llaves {} debemos encapsular cada una de los filtros que vayamos a añadir a continuacion, a su vez cada uno de los filtros se encapsula entre corchetes [] y debe de contener el atributo con el que se hara la validacion, el operador y el valor a validar, ej. [{attr:'id',oper:'=',val:'1'},{logic:'or',attr:'id',oper:'=',val:'2'}] donde el resultado de esta query seria: "WHERE id = 1 or id = 2"  
order | Este campo no puede quesar vacio, y se coloca la columna por la cual queremos ordenar, ej. 'id'  
asc | Esta campo no puede quedar vacio, y se coloca un booleano indicando el tipo de orden que tendra, ej. true si queremos que se muestren ascendentemente o false si queremos que se muestren descendentemente  
limit | Este campo no puede quedar vacio, es para indicar el numero maximo de elementos que queremos que regrese la consulta, ej. 10  


## selectOne(params)
El llamado a la funcion se hace de la siguiente manera selectOne(table,columns,filters)  
Donde cada uno de los parametros puede tomar los siguientes valores:
| Parametro | Descripcion |
| :---: | :---: |
| table | Este parametro nunca se puede dejar vacio, ej. 'User' |
| columns | Este parametro se puede dejar vacio de la siguiente manera: '', con dobles comillas sin espacio entre ellas, o especificar las columnas que queremos obtener ej. ['id','type'] |
| filters | Este parametro se puede dejar vacio de la siguiente manera: '', con dobles comillas sin espacio entre ellas, o especificar los filtros de la siguiente manera: entre llaves {} debemos encapsular cada una de los filtros que vayamos a añadir a continuacion, a su vez cada uno de los filtros se encapsula entre corchetes [] y debe de contener el atributo con el que se hara la validacion, el operador y el valor a validar, ej. [{attr:'id',oper:'=',val:'1'},{logic:'or',attr:'id',oper:'=',val:'2'}] donde el resultado de esta query seria: "WHERE id = 1 or id = 2" |

Recomendacion: Hacer los filtros lo mas certeros posiles, ya que esta funcion solo va a regresar un solo emento de la tabla, si hay mas de un elemento que coincide con los filtros establecidos, regresara el primero que encuentre.
