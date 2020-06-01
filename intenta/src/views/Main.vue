<template>
    <div>
        <b-row>
            <b-col cols="3" >
                <hr class="my-0 bg-mnu-left"/>
                <div
                    class="collapsed text-white bg-mnu-left"
                    style="margin-top:-25px; height:30px"
                    >

                    <span class="ml-4 text-muted">
                        <font-awesome-icon icon="home"/>
                        <label class="ml-3" >Inicio</label>
                    </span>
                    
                </div>
                <hr class="my-0 bg-mnu-left"/>
                <div
                    :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    @click="visible = !visible"
                    class="text-white py-2 bg-mnu-left"
                    >
                    <span class="ml-4 text-muted">
                        <font-awesome-icon icon="user-friends"/>
                        <label class="ml-3" >Grupos</label>
                        
                    </span>
                </div>
                <b-collapse id="collapse-4" v-model="visible" class="mt-2">
                    <b-card>I should start open!</b-card>
                </b-collapse>
                <hr class="my-0 bg-mnu-left"/>
                <div
                    :class="visible1 ? null : 'collapsed'"
                    :aria-expanded="visible1 ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    @click="visible1 = !visible1"
                    class="text-white py-2 bg-mnu-left"
                    >
                    <span class="ml-4 text-muted">
                        <font-awesome-icon icon="clipboard"/>
                        <label class="ml-3" >Materias</label>
                        
                    </span>
                </div>
                <b-collapse id="collapse-4" v-model="visible1" class="mt-2">
                    <b-card>I should start open!</b-card>
                </b-collapse>
            </b-col>
            <b-col cols="9">
                <b-container>
                    <h1 class="text-center text-muted" >Escritorio</h1>

                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis perferendis minima quas asperiores dolor distinctio vero. Voluptate nisi error non fugit libero. Laboriosam aspernatur quia, sint non nulla pariatur at.</p>

                    
                    <!-- <b-card no-body>
                        <b-tabs v-model="tabIndex" small card>
                            <b-tab title="General">
                                I'm the first fading tab
                                <b-card>I'm the first fading tab</b-card>
                            </b-tab>
                            <b-tab title="Edit profile">
                            I'm the second tab
                            <b-card>I'm the card in tab</b-card>
                            </b-tab>
                            <b-tab title="Premium Plan" disabled>Sibzamini!</b-tab>
                            <b-tab title="Info">I'm the last tab</b-tab>
                        </b-tabs>
                    </b-card>

                    <div class="text-center">
                        <b-button-group class="mt-2">
                            <b-button @click="tabIndex--">Previous</b-button>
                            <b-button @click="tabIndex++">Next</b-button>
                        </b-button-group>

                        <div class="text-muted">Current Tab: {{ tabIndex }}</div>
                    </div> -->
                </b-container>
            </b-col>
        </b-row>
    </div>
</template>

<style >
.bg-mnu-left{
    background-color:#343a40 !important;
    cursor: pointer;
}
label{cursor: pointer;}
</style>

<script>
export default {
    data() {
      return {
        tabIndex: 1,
        visible:false,
        visible1:false
      }
    }
}
</script>