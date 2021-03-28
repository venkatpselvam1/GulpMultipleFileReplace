# What we have:
* Folder named `src`
* `src` contains files `story.txt`, `story1.txt`, `story1.txt`
* All the 3 files contains the following text for 25 lines.
```
"The quick brown cat jumped over the lazy dog." 
```

# Goal:
We want to copy these files from the "src" folder to "output" folder.

Replace some words in the files.
* brown   =>  black
* quick   =>  slow
* lazy    =>  busy
* dog     =>  donkey
* cat     =>  mouse

# Approach 1:
```gulp
gulp hardcoded_pipe
```
This works but not good practice. In our use case, we are expecting this dictionary to come from an API. We don't know what the words we are going to replace. In that case, this approach will not work.
```js
function multiple_replace_using_hardcoded_pipe(cb){
  return src('src/*.txt')
  .pipe(gulp_replace("brown", "black"))
  .pipe(gulp_replace("lazy", "busy"))
  .pipe(gulp_replace("dog", "donkey"))
  .pipe(dest('output/'));
}
```

# Approach 2:
```gulp
gulp failure_for_with_pipe
```
We removed the hardcoding text but it won't work. Only the last replace works.
![Replace Failure](https://github.com/venkatpselvam1/GulpMultipleFileReplace/blob/master/images/failure.PNG?raw=true)
```js
function multiple_replace_using_gulp_replace_fails(cb){
  for(var key in keysToReplace){
    console.log("Trying to replace " + key +"by " + keysToReplace[key]);
    src('src/*.txt')
      .pipe(gulp_replace(key, keysToReplace[key]))
      .pipe(dest('output/'));
  }
  cb();
}
```

# Approach 3:
```gulp
gulp
```
we are using [rxjs](https://rxjs-dev.firebaseapp.com/) and also not hard coding anything words. We are expecting this dict `keysToReplace` to come from any API.
```js
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
```

# Conclusion
This is common use-case but solving by gulp is little tricky. I used one `rxjs`, to solve the problem. There can be other ideas to solve this.