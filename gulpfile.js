var gulp_replace = require('gulp-string-replace');
var replace = require('replace');
const { src, dest, series } = require('gulp');
const { from } =require('rxjs');

// typically this is an API response.
let keysToReplace = 
{
  "brown" : "black",
  "quick" : "slow",
  "lazy" : "busy",
  "dog" : "donkey",
  "cat" : "mouse"
};

// this will work but the problem is we need to hard code the keys.
function multiple_replace_using_hardcoded_pipe(cb){
  return src('src/*.txt')
  .pipe(gulp_replace("brown", "black"))
  .pipe(gulp_replace("lazy", "busy"))
  .pipe(gulp_replace("dog", "donkey"))
  .pipe(dest('output/'));
}

// Here we replaced the hard coded pipe with for
// This will fail to replace multiple content.
function multiple_replace_using_gulp_replace_fails(cb){
  for(var key in keysToReplace){
    console.log("Trying to replace " + key +"by " + keysToReplace[key]);
    src('src/*.txt')
      .pipe(gulp_replace(key, keysToReplace[key]))
      .pipe(dest('output/'));
  }
  cb();
}

//copy file to the new location
function copyFiles(){
  return src('src/*.txt')
  .pipe(dest('output/'));
}

//replace using rxjs
function multiple_replace_using_rxjs_subscribe_passes(cb){
  var keys = Object.keys(keysToReplace);
  from(keys).subscribe(key => 
    {
      console.log(key+" " + keysToReplace[key]);
      replace({
        regex: key,
        replacement: keysToReplace[key],
        paths: ['output/'],
        recursive: true,
        silent: true,
      });
    });
  cb();
}

exports.hardcoded_pipe = multiple_replace_using_hardcoded_pipe
exports.failure_for_with_pipe = multiple_replace_using_gulp_replace_fails
exports.default = series(copyFiles, multiple_replace_using_rxjs_subscribe_passes)
