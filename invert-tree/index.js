function invertTree(tree) {

  if (typeof tree === 'undefined' ||
    (!tree.left && !tree.right)
  ) {

    // It's a leaf node
    return;
  }

  invertTree(tree.right);
  invertTree(tree.left);

  var tmp = tree.right;
  tree.right = tree.left;
  tree.left = tmp;
}

module.exports = invertTree;