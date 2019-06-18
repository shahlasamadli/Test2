let dropWrapper=document.querySelector('.dropWrapper');

dropWrapper.addEventListener('dragover',function(e){
    e.preventDefault();
    dropWrapper.classList.add('active')
})
dropWrapper.addEventListener('dragleave',function(){
    dropWrapper.classList.remove('active');
})
dropWrapper.addEventListener('drop',function(e){
    e.preventDefault();
    dropWrapper.classList.remove('active');
    FillTable(e.dataTransfer.files);

})

function FillTable(images){
    for(const file of images){
        if(file.type.match("image*")){
            const tr=document.createElement('tr');
            const reader=new FileReader();
            reader.onload=function(readerEvent){
                let imageTd=document.createElement('td');
                const img=document.createElement('img');
                img.src=readerEvent.target.result;
                img.width=200;
                img.height=200;
                imageTd.appendChild(img);
                tr.insertBefore(imageTd,tr.firstChild);
            }
            reader.readAsDataURL(file);

            //Create image name td
            const nameTd=document.createElement('td')
            nameTd.innerText=file.name
            
            //Create image size td
            const sizeTd=document.createElement('td');
            sizeTd.innerText=(file.size/1024).toFixed(2) + 'kb'
           
            //Create image date td
            const dateTd=document.createElement('td');
            dateTd.innerText=new Date(file.lastModified).toString()
            
            //Create image type td
            const typeTd=document.createElement('td');
            typeTd.innerText=file.type;

            const deleteTd=document.createElement('td')
            const icon=document.createElement('i');
            icon.className="fas fa-times";
            deleteTd.appendChild(icon);
            icon.onclick=function(){
                this.parentElement.parentElement.remove()
            }

            tr.appendChild(nameTd)
            tr.appendChild(sizeTd)
            tr.appendChild(dateTd)
            tr.appendChild(typeTd)
            tr.appendChild(deleteTd);

            document.querySelector('#mainTable tbody').appendChild(tr)
            document.querySelector('#mainTable').classList.remove('d-none')
        }
    }
}