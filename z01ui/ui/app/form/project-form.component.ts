import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { UsersService } from '../../services/users.service';
import { StateService } from '@uirouter/core';
import { UploadOutput, UploadFile } from 'ngx-uploader';

@Component({
    selector: 'project-form',
    templateUrl: './project-form.component.html',
    styles: [require('./project-form.component.scss').toString()]
})
export class FormComponent implements OnInit {
    @Input() project;
    @Input() groups;

    private data: object = {};
    private isEditMode: boolean = false;
    private isProcessing: boolean = false;
    private error: string;
    private quillToolbar: object = {toolbar: ['bold','italic','underline','strike',{'header':1},{'header':2},
        {'list':'ordered'},{'list':'bullet'},'blockquote','code-block','link']};
    private selectedValue;
    public selectedFiles;
    private files;
    dragOver: boolean;

    constructor(private projectService: ProjectsService, private stateService: StateService, private usersService: UsersService) {
        this.files = [];
    }

    ngOnInit() {
        if (this.project) {
            this.data = Object.assign({}, this.project);
            this.isEditMode = true;
            this.selectedValue = this.data.groupID;
        }
    }

    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') {
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
            this.files.push(output.file);
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
    }

    submit() {
        this.error = '';
        this.isProcessing = true;
        this.data.groupID = this.selectedValue;
        const fd = this.uploadImage();
        this.projectService
            .uploadDocument(fd)
            .then((documents: object) => {
            this.data.imageUrl = documents.urls[0] || null;
                this.projectService
                    .add(this.data)
                    .then((id: number) => this.stateService.go('details', { projectId: id }))
                    .catch((e) => { this.error = e.error; console.log('error', e) })
                    .then(() => this.isProcessing = false);
            })
            .catch((e) => { this.error = e.error; console.log('error', e) })
            .then(() => this.isProcessing = false);
    }

    uploadImage(){
        let fd = new FormData();
        if (this.files.length > 0) {
            for (let i = 0; i < this.files.length; i++) {
                let uploadFile = <BlobFile>this.files[i].nativeFile;
                fd.append('files[]', uploadFile, uploadFile.name);
            }
        }
        return fd;
    }

    update() {
        this.error = '';
        this.isProcessing = true;
        this.data.groupID = this.selectedValue;

        this.projectService
            .update(this.data)
            .then(() => this.stateService.go('details', {projectId: this.project.id}))
            .catch((e) => {
                this.error = e.error;
                console.log('error', e)
            })
            .then(() => this.isProcessing = false);
    }

    goBack() {
        if (this.project) {
            // Go back from edit projects page
            this.stateService.go('details', {projectId: this.project.id});
        } else {
            // Go back from add projects page
            this.stateService.go('projects');
        }
    }
}