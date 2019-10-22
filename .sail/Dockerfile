FROM codercom/ubuntu-dev

RUN sudo apt-get update && sudo apt install -y cmake python-setuptools python-pip python-wheel

RUN sudo pip install wasienv

RUN curl https://get.wasmer.io -sSfL | sh

RUN sudo wasienv install-sdk unstable

RUN sudo wasienv default-sdk unstable
