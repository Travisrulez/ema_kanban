<template>
    <div :id="id" @dragover.prevent @drop.prevent="drop" class="cards">
        <slot/>
    </div>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "Board",
        props: ['id'],
        methods: {
            drop: e => {
                const card_id = e.dataTransfer.getData('card_id')
                const card = document.getElementById(card_id)

                card.style.display = "flex"
                e.target.appendChild(card)

                eventBus.$emit('needTime')
                eventBus.$emit('done')
                eventBus.$emit('backToPlan')
                eventBus.$emit('makeCount')
            }
        }
    }
</script>
