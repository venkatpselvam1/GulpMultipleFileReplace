var replace = require('gulp-string-replace');
const { src, dest } = require('gulp');
let keysToReplace = 
{
  "grape" : "Muscat",
  "mango" : "Malgoa Mango",
  "banana" : "Red Banana"
};

function replace_files_by_singe_word(cb){
  return src('src/*.json')
  .pipe(replace("grape", "Muscat"))
  .pipe(dest('output/'));
}

// This will fail to replace multiple content.
function replace_files_by_dict_with_for(cb){
  for(var key in keysToReplace){
    console.log("Trying to replace " + key +"by " + keysToReplace[key]);
    src('src/*.json')
  .pipe(replace(key, keysToReplace[key]))
  .pipe(dest('output/'));
  }
  cb();
}

// exports.default = replace_files_by_singe_word
exports.default = replace_files_by_dict_with_for