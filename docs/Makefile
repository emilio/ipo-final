BIB := $(wildcard *.bib)

all: memoria.pdf
	@echo > /dev/null

%.pdf: %.md $(BIB)
	$(info [doc] $< -> $@)
	@pandoc --from=markdown --to=latex --latex-engine=xelatex $< -o $@ --filter pandoc-citeproc
