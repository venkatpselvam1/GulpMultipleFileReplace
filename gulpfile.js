const { src, dest } = require('gulp');
let keysToReplace = 
{
  "grape" : "Muscat",
  "mango" : "Malgoa Mango",
  "banana" : "Red Banana"
};

function replace_files_by_dict(cb){
  return src('src/*.json')
  .pipe(dest('output/'));
  cb();
}

exports.default = replace_files_by_dict