function linkedList() {
    var Node = function(route) {
        this.route = route;
        this.linkDer = null;
        this.linkIzq = null;
    }

    var ptr = null
    var listsize = 0;

    this.create = create;
    this.add = add;
    this.getPtr = getPtr;
    this.show = show;
    this.hola = hola;
    this.size = size;
    this.linkedList = linkedList;

    function create(images) {
        images.forEach(function(element, index) {
            add(element);
        });
    }

    function hola(){
        console.log('Hola');
    }
    function show () {
    	aux = ptr;
    	while (aux) {
    		console.log(aux.route);
    		aux = aux.linkDer
    	}
    }

    function add(element) {

        var node = new Node(element);
        var aux;

        // Verificamos si es el primer nodo en la lista
        if (!ptr) {
            ptr = node;
        } else {
            aux = ptr;

            // Este ciclo se ejecuta hasta que llegue al último elemento
            while (aux.getDer != null) {
                aux = aux.getDer;
            }

            // Obtenemos el último elemento y lo asigamos a next para crear el enlace
            aux.linkDer = node;
            node.linkIzq = aux;
        }

        // Incrementamos el tamaño de la lista
        listSize++;
    }

    function indexOf(element) {
        var aux = ptr;
        var index = 0;

        while (aux) {
            if (aux.element === element) {
                return index;
            }

            index++;
            aux = aux.getDer;
        }

        return -1;
    }

    function hasElements() {
        return listSize > 0;
    }

    function remove(element) {
        var index = this.indexOf(element);

        return this.removeFrom(index);
    }

    function removeFrom(pos) {
        // Verificamos que la posición exista
        if (pos > -1 && pos < listSize) {
            var currentNode = headNode;
            var previousNode;
            var index = 0;

            // Si pos 0, entonces eliminaremos el primer elemento.
            if (pos === 0) {
                headNode = currentNode.next;
            } else {
                while (index++ < pos) {
                    // Mandamos el nodo actual a previous
                    previousNode = currentNode;

                    // Ahora el actual será el next
                    currentNode = currentNode.next;
                }

                // Enlazamos el next de previous con el next del nodo actual (lo saltamos para eliminarlo)
                previousNode.next = currentNode.next;
            }

            // Restamos el elemento eliminado de la lista
            listSize--;

            // Retornamos el valor del elemento eliminado
            return currentNode.element;
        }

        // Si la posición esta fuera de rangos regresamos null
        return null;
    }

    function getPtr() {
        return ptr;
    }


    function size(argument) {
        return listSize;
    }


}

class linkedList{

    constructor(ptr){
        this.ptr = ptr;
    }

    getPtr(){
        return this.ptr;
    }

}