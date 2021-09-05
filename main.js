Vue.component('task-section', {
    props: ['value', 'sections', 'section', 'sectionId'],
    template : `
        <div class="col-1 mx-2" style="width: 15rem">
            <input class="form-control mb-3" type="text" :value="value" v-on:input="$emit('input', $event.target.value)">
            <div>
                <task v-for="(task, index) in section.tasks" :key="index" :task="task" :taskId="index" :sectionId="sectionId" :sections="sections"></task>
            </div>
            <task-new :sections="sections" :sectionId="sectionId"></task-new>
        </div>
        
    `
})

Vue.component('task', {
    props: ['task', 'taskId', 'sectionId', 'sections'],
    data: function () {
        return {
            liked: false,
            finished: false,
            selected: this.sectionId
        }
    },
    computed: {
        getLiked: function(){
            return this.liked == true ? 'yellow' : 'grey';
        },

        isFinished: function(){
            return this.finished == true ? 'green' : 'grey';
        }
    },
    methods: {
        editContent: function(){
            let result = window.prompt('Do you edit the content?', this.task.description)
            if(result != null) this.task.description = result;
        }
    },
    template: `
    <div class="card card-shadow mb-2">
        <div class="card-body">
            <h5 class="card-title">{{ task.name }}</h5>
            <select class="form-select" v-model="selected" disabled>
                <option v-for="(section, index) in sections" :value="index">{{ index }}</option>
            </select>               
            <p class="card-text text-muted my-4">{{ task.description }}</p>
            <div class="d-flex justify-content-end">
                <i class="fas fa-edit grey mx-2"　v-on:click="editContent()"></i>
                <i class="fas fa-trash grey mx-2" v-on:click="sections[sectionId].tasks.splice(taskId, 1)"></i>
                <i class="fas fa-check mx-2" :class="isFinished" v-on:click="finished = !finished"></i>
                <i class="fas fa-star mx-2" :class="getLiked" v-on:click="liked = !liked"></i>
            </div>
        </div>
    </div>
    `
})

Vue.component('task-new', {
    props: ['sections', 'sectionId'],
    data: function () {
        return {
            showForm: false,
            taskName: '',
            taskDescription: ''
        }
    },
    methods: {
        resetTaskState: function(){
            this.taskName = '';
            this.taskDescription = '';
        }
    },
    template: `
        <div>
            <i class="fas fa-plus grey" v-on:click="showForm = (showForm == false) ? true : false"></i>
            <form v-if="showForm">
                <div class="mb-3">
                    <label for="inputTaskTitle" class="form-label">Task Title</label>
                    <input type="text" class="form-control" id="inputTaskTitle" placeholder="e.g. Study CS" v-model="taskName">
                </div>
                <div class="mb-3">
                    <label for="inputTaskDescription" class="form-label">Task Description</label>
                    <input type="text" class="form-control" id="inputTaskDescription" placeholder="e.g. recursion" v-model="taskDescription">
                </div>
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary col-5" v-on:click="showForm = false">Cancel</button>
                    <button type="button" class="btn btn-primary col-5" v-on:click="sections[sectionId].tasks.push({name: taskName, description: taskDescription}); resetTaskState(); showForm = false">Add</button>
                </div>
            </form>
        </div>
    `
})

var vm = new Vue ({
    el: '#app',
    data: {
        newSectionTitle: '',
        sections: [
            {
                title: 'Monday',
                tasks: [
                    {
                        name: 'Study',
                        description: 'recursion, tree'
                    },
                    {
                        name: 'Lunch',
                        description: 'at a restarurant'
                    }
                ]
            },
            {
                title: 'Tuesday',
                tasks: [
                    {
                        name: 'Go to mall',
                        description: 'with my friends'
                    },
                    {
                        name: 'Play football',
                        description: 'at a park'
                    }
                ]
            }
        ],
    },
    methods: {
        addSection: function(){
            this.sections.push({title: this.newSectionTitle, tasks: []});
            this.newSectionTitle = '';
        },
    }
})