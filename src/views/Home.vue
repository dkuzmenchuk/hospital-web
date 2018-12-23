<template>
    <div class="home">
        <v-container>
            <v-layout>
                <carousel></carousel>
            </v-layout>
            <v-container>
                <v-layout>
                    <v-flex
                            xs12 sm6
                            style="margin: 10px;"
                    >
                        <v-card>
                            <v-img
                                    src="/img/med-home.jpg"
                            ></v-img>

                            <v-card-text primary-title>
                                <div>
                                    <h3 class="headline mb-0">Медицинская помощь на дому</h3>
                                    <div>
                                        Для динамического медицинского наблюдения за здоровьем пациента в домашних
                                        условиях организована СЛУЖБА ВЫЗОВА ВРАЧА НА ДОМ
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex
                            xs12 sm6
                            style="margin: 10px;"
                    >
                        <v-card>
                            <v-img
                                    src="/img/schedule-holidays.jpg"
                            ></v-img>

                            <v-card-text primary-title>
                                <div>
                                    <h3 class="headline mb-0">График работы в новогодние праздники</h3>
                                    <div>
                                        Как работает медицинский центр в праздничные дни?
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex
                            xs12 sm6
                            style="margin: 10px;"
                    >
                        <v-card>
                            <v-img
                                    src="/img/driver-med.png"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">Водительская медкомиссия</h3>
                                    <div>
                                        Порядок получения медицинской справки, подтверждающей годность к управлению механическими транспортными средствами
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex
                            xs12 sm6
                            style="margin: 10px;"
                    >
                        <v-card>
                            <v-img
                                    src="/img/vakcinaciya.jpg"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">Начинается вакцинация детей и взрослых против гриппа</h3>
                                    <div>
                                        Применяется вакцина «ИНФЛЮВАК», «ВАКСИГРИП», «ВАКСИГРИП ТЕТРА»
                                    </div>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-container>
    </div>
</template>

<script>
  import Carousel from '@/components/Carousel.vue';

  export default {
    name: 'home',
    components: {
      Carousel
    }
  }
</script>
