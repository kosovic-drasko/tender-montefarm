package tender.web.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tender.domain.Vrednovanje;
import tender.repository.VrednovanjeRepository;
import tender.service.VrednovanjeQueryService;
import tender.service.VrednovanjeService;
import tender.service.criteria.VrednovanjeCriteria;

/**
 * REST controller for managing {@link Vrednovanje}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VrednovanjeResource {

    private final Logger log = LoggerFactory.getLogger(VrednovanjeResource.class);

    private final VrednovanjeQueryService VrednovanjeQueryService;

    private VrednovanjeService vrednovanjeService;

    private VrednovanjeRepository viewVrednovanjeRepository;

    public VrednovanjeResource(
        VrednovanjeService vrednovanjeService,
        VrednovanjeRepository vrednovanjeRepository,
        VrednovanjeQueryService vrednovanjeQueryService
    ) {
        this.vrednovanjeService = vrednovanjeService;
        this.VrednovanjeQueryService = vrednovanjeQueryService;
    }

    @GetMapping("/vrednovanjes")
    public ResponseEntity<List<Vrednovanje>> getAllVrednovanjes(VrednovanjeCriteria criteria) {
        log.debug("REST request to get Vrednovanjes by criteria: {}", criteria);
        List<Vrednovanje> entityList = VrednovanjeQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }
}
