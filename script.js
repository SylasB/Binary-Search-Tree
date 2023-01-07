// const randomArray = (size) => {
//     return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
// }

// class node {
//     constructor (data, left = null, right = null) {
//         this.data = data;
//         this.left = left;
//         this.right = right;
//     }
// }

// class binaryTree {
//     constructor (array) {
//         const sortedArray = [...new Set(array)].sort((a, b) => a - b);
//         this.root = this.buildTree(sortedArray);
//     }

    // buildTree(sortedArray) {
    //     if (sortedArray.length === 0) return null;

    //     const midpoint = Math.floor(sortedArray.length / 2);
    //     const newNode = node(sortedArray[midpoint]);
    //     newNode.leftChild = this.buildTree(sortedArray.slice(0, midpoint));
    //     newNode.rightChild = this.buildTree(sortedArray.slice(midpoint + 1));
    //     return newNode;
    // }

    
// }

// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node.right !== null) {
//       prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//     if (node.left !== null) {
//       prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
// }

class Node {
    constructor (data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
};


class BST {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const node = this.root;
        if (node === null) {
          this.root = new Node(data);
          return;
        } else {
          const searchTree = function(node) {
            if (data < node.data) {
              if (node.left === null) {
                node.left = new Node(data);
                return;
              } else if (node.left !== null) {
                return searchTree(node.left);
              }
            } else if (data > node.data) {
              if (node.right === null) {
                node.right = new Node(data);
                return;
              } else if (node.right !== null) {
                return searchTree(node.right);
              }
            } else {
              return null;
            }
          };
          return searchTree(node);
        }
      }

    delete(data) {
         const removeNode = function(node, data) {
            if (node === null) {
                 return null;
            }
            if (data == node.data) {
                if (node.left == null && node.right == null) {
                    return null;
                }

                if (node.left == null) {
                    return node.right;
                }
                
                if (node.right == null) {
                    return node.left;
                }

                var tempNode = node.right;

                while (tempNode.left !== null) {
                tempNode = tempNode.left;
                }

                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;

                } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;

                } else {
                node.right = removeNode(node.right, data);
                return node;
                }
            }
        this.root = removeNode(this.root, data);
        }

    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1);
    }

    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        }

        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);

        if (left < right) {
            return left + 1;
        } else {
            return right +1;
        }
    }

    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        }

        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);

        if (left > right) {
            return left + 1;
        } else {
            return right +1;
        }
    }

    find(data, node = this.root) {
        if (node === null || node.data === data) {
            return node;    
        }
        
        if (node.data < data) {
            return this.find(data, node.right);
        } else {
            return this.find(data, node.left);
        }
    }

    levelOrder() {
        let result = [];
        let Q = [];

        if (this.root != null) {
            Q.push(this.root);
            while(Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                }
                if (node.right != null) {
                    Q.push(node.right);
                }
            }
            return result;
        } else {
            return null;
        }
    }

    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();
            function traverseInOrder(node) {
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }

            traverseInOrder(this.root);
            return result;
        }
    }

    preOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();
            function traversePreOrder(node) {
                result.push(node.data);
                node.left && traversePreOrder(node.left);
                node.right && traversePreOrder(node.right);
            }
            
            traversePreOrder(this.root);
            return result;
        }
    }

    postOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();
            function traversePostOrder(node) {
                node.left && traversePostOrder(node.left);
                node.right && traversePostOrder(node.right);
                result.push(node.data);
            }

            traversePostOrder(this.root);
            return result;
        }
    }

    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                console.log('Present');
                return true;
            }
            if (data < current.data) {
                current = current.left;
            }
            if (data > current.data) {
                current = current.right;
            }
        }
        console.log('Not Present');
        return false;
    } 

    //Height
    height(node = this.root) {
        if (node == null) {
           
            return 0;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    //Depth
    depth(data, node = this.root, edgeCount = 0) {
        if (node == null) {
            return null;
        } 

        if (node.data = data) {
            //console.log(edgeCount);
            return edgeCount;
        }

        if (node.data < data) {
            return this.depth(data, node.right, edgeCount + 1);
        } else {
            return this.depth(data, node.left, edgeCount + 1);
        }
    }

///////////
}




const bst = new BST();

bst.insert(5);
bst.insert(7);
bst.insert(2);
bst.insert(60);
bst.insert(9);

//bst.delete(60);

//console.log(bst.find(2));

//console.log(bst.levelOrder());

//console.log(bst.inOrder());

//console.log(bst.preOrder());

//console.log(bst.postOrder());

// bst.isPresent(9);

// bst.isPresent(90);

console.log(bst.depth(60));

console.log(bst.height(5));

console.log(bst);